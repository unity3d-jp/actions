# actions

A collection of Github actions.

## read-file

Read a file


| Inputs   |                      |
|----------|----------------------|
| filepath | The path to the file |

| Outputs |                                             |
|---------|---------------------------------------------|
| content | The content of the file |

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
