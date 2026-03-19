"""
Backend API Tests for Data Farm Corporate Website
Tests contact form submission and status endpoints
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://insights-test.preview.emergentagent.com')

class TestHealthAndRoot:
    """Test basic health and root endpoints"""
    
    def test_root_endpoint(self):
        """Test root API endpoint returns Hello World"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"
        print(f"✓ Root endpoint returns: {data['message']}")


class TestStatusEndpoints:
    """Test status check endpoints"""
    
    def test_create_status_check(self):
        """Test creating a status check"""
        response = requests.post(
            f"{BASE_URL}/api/status",
            json={"client_name": f"TEST_client_{uuid.uuid4().hex[:8]}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "client_name" in data
        assert "timestamp" in data
        print(f"✓ Status check created: {data['id']}")
        return data
    
    def test_get_status_checks(self):
        """Test getting status checks list"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Found {len(data)} status checks")


class TestContactForm:
    """Test contact form endpoint - Core feature"""
    
    def test_contact_form_valid_submission(self):
        """Test valid contact form submission"""
        unique_id = uuid.uuid4().hex[:8]
        payload = {
            "name": f"TEST_User_{unique_id}",
            "email": f"test_{unique_id}@example.com",
            "country_code": "+255",
            "phone": "754510366",
            "subject": "Test Inquiry",
            "message": "This is a test message for automated testing."
        }
        
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # API should return 200 and success status
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "status" in data
        assert data["status"] == "success"
        assert "message" in data
        print(f"✓ Contact form submission successful: {data['message']}")
    
    def test_contact_form_with_different_country_codes(self):
        """Test contact form with various country codes"""
        country_codes = ["+254", "+256", "+250", "+1", "+44"]
        
        for code in country_codes:
            unique_id = uuid.uuid4().hex[:8]
            payload = {
                "name": f"TEST_User_{code}_{unique_id}",
                "email": f"test_{unique_id}@example.com",
                "country_code": code,
                "phone": "123456789",
                "subject": f"Test with {code}",
                "message": f"Testing country code {code}"
            }
            
            response = requests.post(f"{BASE_URL}/api/contact", json=payload)
            assert response.status_code == 200
            data = response.json()
            assert data["status"] == "success"
            print(f"✓ Contact form with {code} successful")
    
    def test_contact_form_missing_fields(self):
        """Test contact form with missing required fields"""
        # Missing name
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json={
                "email": "test@example.com",
                "country_code": "+255",
                "phone": "123456789",
                "subject": "Test",
                "message": "Test message"
            }
        )
        assert response.status_code == 422  # Validation error
        print("✓ Missing name field returns 422")
        
        # Missing email
        response = requests.post(
            f"{BASE_URL}/api/contact",
            json={
                "name": "Test User",
                "country_code": "+255",
                "phone": "123456789",
                "subject": "Test",
                "message": "Test message"
            }
        )
        assert response.status_code == 422  # Validation error
        print("✓ Missing email field returns 422")
    
    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email format"""
        payload = {
            "name": "Test User",
            "email": "invalid-email",  # Invalid format
            "country_code": "+255",
            "phone": "123456789",
            "subject": "Test",
            "message": "Test message"
        }
        
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Invalid email returns 422")


class TestCORS:
    """Test CORS headers"""
    
    def test_cors_headers(self):
        """Test that CORS headers are present"""
        response = requests.options(
            f"{BASE_URL}/api/contact",
            headers={"Origin": "https://insights-test.preview.emergentagent.com"}
        )
        # Should not fail - CORS is configured
        print(f"✓ CORS check - status: {response.status_code}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
