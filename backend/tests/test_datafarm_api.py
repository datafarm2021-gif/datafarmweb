"""
Data Farm API Tests
Tests for the Data Farm corporate website backend API endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://datafarm-preview.preview.emergentagent.com')

class TestHealthEndpoints:
    """Test basic API health and root endpoints"""
    
    def test_root_endpoint(self):
        """Test the root API endpoint returns Hello World"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert data["message"] == "Hello World"
        print("✓ Root endpoint working correctly")

    def test_status_endpoint_get(self):
        """Test GET /api/status endpoint"""
        response = requests.get(f"{BASE_URL}/api/status")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Status endpoint returned {len(data)} records")

    def test_status_endpoint_post(self):
        """Test POST /api/status endpoint"""
        payload = {"client_name": "TEST_datafarm_test_client"}
        response = requests.post(f"{BASE_URL}/api/status", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert "client_name" in data
        assert data["client_name"] == "TEST_datafarm_test_client"
        assert "timestamp" in data
        print(f"✓ Status POST created record with id: {data['id']}")


class TestContactFormAPI:
    """Test contact form submission endpoint"""
    
    def test_contact_form_valid_submission(self):
        """Test valid contact form submission"""
        payload = {
            "name": "TEST_John Doe",
            "email": "test@example.com",
            "country_code": "+255",
            "phone": "754510366",
            "subject": "Test Inquiry",
            "message": "This is a test message from automated testing."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert data["status"] == "success"
        assert "message" in data
        print(f"✓ Contact form submission successful: {data['message']}")

    def test_contact_form_missing_name(self):
        """Test contact form with missing name field"""
        payload = {
            "email": "test@example.com",
            "country_code": "+255",
            "phone": "754510366",
            "subject": "Test Inquiry",
            "message": "This is a test message."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Contact form correctly rejects missing name")

    def test_contact_form_invalid_email(self):
        """Test contact form with invalid email format"""
        payload = {
            "name": "TEST_John Doe",
            "email": "invalid-email",
            "country_code": "+255",
            "phone": "754510366",
            "subject": "Test Inquiry",
            "message": "This is a test message."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Contact form correctly rejects invalid email")

    def test_contact_form_missing_phone(self):
        """Test contact form with missing phone field"""
        payload = {
            "name": "TEST_John Doe",
            "email": "test@example.com",
            "country_code": "+255",
            "subject": "Test Inquiry",
            "message": "This is a test message."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Contact form correctly rejects missing phone")

    def test_contact_form_missing_subject(self):
        """Test contact form with missing subject field"""
        payload = {
            "name": "TEST_John Doe",
            "email": "test@example.com",
            "country_code": "+255",
            "phone": "754510366",
            "message": "This is a test message."
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Contact form correctly rejects missing subject")

    def test_contact_form_missing_message(self):
        """Test contact form with missing message field"""
        payload = {
            "name": "TEST_John Doe",
            "email": "test@example.com",
            "country_code": "+255",
            "phone": "754510366",
            "subject": "Test Inquiry"
        }
        response = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert response.status_code == 422  # Validation error
        print("✓ Contact form correctly rejects missing message")

    def test_contact_form_different_country_codes(self):
        """Test contact form with different country codes"""
        country_codes = ["+254", "+256", "+250", "+1", "+44"]
        for code in country_codes:
            payload = {
                "name": f"TEST_User_{code}",
                "email": "test@example.com",
                "country_code": code,
                "phone": "123456789",
                "subject": f"Test from {code}",
                "message": f"Testing country code {code}"
            }
            response = requests.post(f"{BASE_URL}/api/contact", json=payload)
            assert response.status_code == 200
            print(f"✓ Contact form accepts country code {code}")


class TestAPIErrorHandling:
    """Test API error handling"""
    
    def test_invalid_endpoint(self):
        """Test that invalid endpoints return 404"""
        response = requests.get(f"{BASE_URL}/api/nonexistent")
        assert response.status_code == 404
        print("✓ Invalid endpoint returns 404")

    def test_invalid_method_on_contact(self):
        """Test that GET on contact endpoint returns 405"""
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 405
        print("✓ GET on contact endpoint returns 405 Method Not Allowed")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
