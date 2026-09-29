import requests
import subprocess

print('1. Checking Docker...')
try:
    print(subprocess.check_output('docker ps --format "{{.Names}} - {{.Status}}"', shell=True).decode())
except Exception as e:
    print('Docker not running or error:', e)

print('2. Checking Backend /ready...')
try:
    res = requests.get('http://localhost:8000/ready', timeout=5)
    print('Status:', res.status_code)
    print('Response:', res.json())
except Exception as e:
    print('Backend error:', e)

print('\n3. Testing doctor_a login...')
try:
    res = requests.post('http://localhost:8000/token', data={'username': 'doctor_a', 'password': 'password123'}, timeout=5)
    print('Status:', res.status_code)
    print('Response:', res.json())
except Exception as e:
    print('Login error:', e)
