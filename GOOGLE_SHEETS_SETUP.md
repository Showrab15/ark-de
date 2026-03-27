# Google Sheets Setup Instructions

## Step 1: Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

## Step 2: Create a Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: "ark-de-orders"
   - Description: "Service account for order management"
   - Click "Create and Continue"
4. Skip the optional steps and click "Done"

## Step 3: Generate Service Account Key
1. In the "Credentials" page, find your service account
2. Click on the service account email
3. Go to the "Keys" tab
4. Click "Add Key" > "Create new key"
5. Choose "JSON" format
6. Download the JSON file (keep it secure!)
7. **Open the downloaded JSON file** - it contains all the values you need

## Step 4: Create Google Sheets Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Ark-DE Orders"
4. Create two sheets:
   - "Orders" (for order data)
   - "Users" (for user data)
5. Share the spreadsheet with your service account email (from the JSON file)
6. **Copy the spreadsheet ID from the URL** (the long string between /d/ and /edit)

## Step 5: Extract Values from JSON File

After downloading the service account JSON file, open it and find these values:

### GOOGLE_SHEETS_SPREADSHEET_ID
- **Where to find it:** In the Google Sheets URL after you create the spreadsheet
- **Example URL:** `https://docs.google.com/spreadsheets/d/1ABC123...XYZ/edit`
- **The ID is:** `1ABC123...XYZ` (copy everything between `/d/` and `/edit`)

### GOOGLE_SHEETS_PROJECT_ID
- **Where to find it:** In the JSON file, look for `"project_id"`
- **Example:** `"project_id": "your-project-123"`

### GOOGLE_SHEETS_PRIVATE_KEY_ID
- **Where to find it:** In the JSON file, look for `"private_key_id"`
- **Example:** `"private_key_id": "abc123def456"`

### GOOGLE_SHEETS_PRIVATE_KEY
- **Where to find it:** In the JSON file, look for `"private_key"`
- **Important:** Copy the entire key including the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
- **Format it with `\n` for line breaks in the .env file**

### GOOGLE_SHEETS_CLIENT_EMAIL
- **Where to find it:** In the JSON file, look for `"client_email"`
- **Example:** `"client_email": "service-account-name@project.iam.gserviceaccount.com"`

### GOOGLE_SHEETS_CLIENT_ID
- **Where to find it:** In the JSON file, look for `"client_id"`
- **Example:** `"client_id": "123456789"`

### GOOGLE_SHEETS_CLIENT_X509_CERT_URL
- **Where to find it:** In the JSON file, look for `"client_x509_cert_url"`
- **Example:** `"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/service-account%40project.iam.gserviceaccount.com"`

## Step 6: Configure Environment Variables on Netlify
1. Go to your Netlify dashboard
2. Select your site (arkadee.netlify.app)
3. Go to "Site settings" > "Environment variables"
4. Add all the variables with their values from the JSON file

## Step 7: Redeploy
After setting up the environment variables, trigger a new deployment on Netlify.

## Example .env.local Configuration

```env
GOOGLE_SHEETS_SPREADSHEET_ID=1ABC123...XYZ
GOOGLE_SHEETS_PROJECT_ID=my-project-123456
GOOGLE_SHEETS_PRIVATE_KEY_ID=abc123def456ghi789
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_CLIENT_EMAIL=ark-de-orders@my-project-123456.iam.gserviceaccount.com
GOOGLE_SHEETS_CLIENT_ID=123456789012345678901
GOOGLE_SHEETS_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/ark-de-orders%40my-project-123456.iam.gserviceaccount.com
```