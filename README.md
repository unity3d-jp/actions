# actions

A collection of Github actions.

## append-md-local-url

Append a prefix to local URLs in a Markdown file

| Inputs   | Desc                                       |
|:---------|:-------------------------------------------|
| filepath | The path to the file |
| prefix | The prefix to be appended |

### Usage

```
steps:
  - uses: actions/checkout@v3
  - name: Put prefix
    id: put-prefix
    uses: unity3d-jp/actions/append-md-local-url@main
    with:
      filepath: 'path-to-file'
      prefix: 'foo/bar/'

```

## gdrive-file-copy

Creates a copy of a file and applies any requested updates with patch semantics using the 
[Files: copy API](https://developers.google.com/drive/api/v3/reference/files/copy)
of Google Drive API .

This API requires setting up [Google Services Account (GSA)](GoogleServicesAccount.md). 

| Inputs         | Desc                            |
|:---------------|:--------------------------------|
| credentials    | A base64 encoded string of Google Service Account credentials.|
| fileId         | The source file ID              |
| targetFileName | The target file name (optional) |

| Outputs         | Desc                                   |
|:----------------|:---------------------------------------|
| copiedFileId    | The ID of the copied file            |
| copiedFileName  | The file name of the copied file       |
| driveId         | The drive ID where the file is located |

### Usage

```
steps:
  - uses: actions/checkout@v3
  - name: Copy file on Google Drive
    id: copy-file
    uses: unity3d-jp/actions/gdrive-file-copy@main
    with:
      credentials: ${{ secrets.DRIVE_CREDENTIALS }}
      fileId: 'file-id-on-google-drive'
      targetFileName: 'new-foo-file'
  - name: Print copied file ID
    id: print-file-id
    run: |
      echo "Copied file ID: ${{ steps.copy-file.outputs.copiedFileId }}, on drive ID: ${{ steps.copy-file.outputs.driveId }}" 

```

## read-file

Read a file

| Inputs   | Desc                 |
|:---------|:---------------------|
| filepath | The path to the file |

| Outputs | Desc                     |
|:--------|:-------------------------|
| content | The content of the file  |

### Usage 

```
steps:
  - uses: actions/checkout@v3
  - name: Read file
    id: read-the-file
    uses: unity3d-jp/actions/read-file@main
    with:
      filepath: 'path-to-file'
  - name: Print file
    id: print-the-file
    run: |
      echo "${{ steps.read-the-file.outputs.content }}" 

```

# Misc

* [License](LICENSE.md)
