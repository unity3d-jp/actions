# Google Service Account (GSA)
First of all you will need a **Google Service Account** for your project. 
Service accounts are just specific Google account types that are used by services instead of people.

To make one go to *Service Accounts* in the [*Credentials*](https://console.cloud.google.com/apis/credentials) in the 
section of **Google Cloud Platform** dashboard and create a new project or choose an existing one.
Click on create new service account and continue with the process. 
At the end you will get the option to generate a key, **we need this key so store it safely**. 
It's a json file with the following structure:

```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

### Share Drive folder with the GSA
Go to your **Google Drive** and find the folder you want your files to be uploaded to and share it with the GSA. 
You can find your service account email address in the `client_email` property of your GSA credentials.

While you are here, take a note of **the folder's ID**, 
the long set of characters after the last `/` in your address bar if you have the folder opened in your browser.

### Store credentials as GitHub secrets
This action needs your GSA credentials to properly authenticate with Google 
and this should be kept from public view.
To do this, go to the **Secrets** section of your repo and add a new secret for your credentials. 
As per GitHub's recommendation, we will store any complex data (like your fancy JSON credentials) 
as a base64 encoded string.  
You can encode your `.json` file easily into a new `.txt` file using any bash terminal 
(just don't forget to change the placeholders with the real name of your credentials file and and the desired output):

```bash
$ base64 CREDENTIALS_FILENAME.json > ENCODED_CREDENTIALS_FILENAME.txt
```
The contents of the newly generated `.txt` file is what we have to procure as a value for our secret.



