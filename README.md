# actions

A collection of Github actions.

## append-md-local-url

Append a prefix to local URLs in a Markdown file

| Inputs   | Desc                                       |
|:---------|:-------------------------------------------|
| prefix | The prefix to be appended |

### Usage

```
steps:
  - uses: actions/checkout@v3
  - name: Put prefix
    id: put-prefix
    uses: unity3d-jp/actions/append-md-local-url@main
    with:
      prefix: 'foo/bar/'

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
