$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$markdown = Get-Content -LiteralPath (Join-Path $root 'arquitectura.md') -Raw -Encoding UTF8
$lines = $markdown -split "`r?`n"
$paragraphs = [System.Collections.Generic.List[string]]::new()
$inDiagram = $false
foreach ($line in $lines) {
  if ($line -eq '```mermaid') { $inDiagram = $true; $paragraphs.Add('<w:p><w:pPr><w:pStyle w:val="Heading2"/></w:pPr><w:r><w:t>Diagrama de módulos (representación textual)</w:t></w:r></w:p>'); continue }
  if ($inDiagram -and $line -eq '```') { $inDiagram = $false; continue }
  if ([string]::IsNullOrWhiteSpace($line) -or $line -eq '---') { continue }
  $style = 'Normal'
  $content = $line
  if ($inDiagram) { $style = 'Code' }
  elseif ($line.StartsWith('# ')) { $style = 'Title'; $content = $line.Substring(2) }
  elseif ($line.StartsWith('## ')) { $style = 'Heading1'; $content = $line.Substring(3) }
  elseif ($line.StartsWith('### ')) { $style = 'Heading2'; $content = $line.Substring(4) }
  elseif ($line.StartsWith('- ')) { $style = 'ListParagraph'; $content = '•  ' + $line.Substring(2) }
  $content = $content -replace '\*\*', '' -replace '`', ''
  $escaped = [System.Security.SecurityElement]::Escape($content)
  $paragraphs.Add("<w:p><w:pPr><w:pStyle w:val=`"$style`"/></w:pPr><w:r><w:t xml:space=`"preserve`">$escaped</w:t></w:r></w:p>")
}
$document = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' + ($paragraphs -join '') + '<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body></w:document>'
$styles = @'
<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:style w:type="paragraph" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:sz w:val="22"/><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/></w:rPr><w:pPr><w:spacing w:after="120"/></w:pPr></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="17365D"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="28"/><w:color w:val="17365D"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Code"><w:name w:val="Code"/><w:basedOn w:val="Normal"/><w:rPr><w:rFonts w:ascii="Consolas" w:hAnsi="Consolas"/><w:sz w:val="18"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:ind w:left="360"/></w:pPr></w:style></w:styles>
'@
$output = Join-Path $root 'arquitectura.docx'
if (Test-Path -LiteralPath $output) { Remove-Item -LiteralPath $output }
$stream = [System.IO.File]::Open($output, [System.IO.FileMode]::CreateNew)
$archive = [System.IO.Compression.ZipArchive]::new($stream, [System.IO.Compression.ZipArchiveMode]::Create)
function Add-Entry($archive, $name, $content) {
  $entry = $archive.CreateEntry($name)
  $writer = [System.IO.StreamWriter]::new($entry.Open(), [System.Text.UTF8Encoding]::new($false))
  $writer.Write($content); $writer.Dispose()
}
Add-Entry $archive '[Content_Types].xml' '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>'
Add-Entry $archive '_rels/.rels' '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
Add-Entry $archive 'word/document.xml' $document
Add-Entry $archive 'word/styles.xml' $styles
Add-Entry $archive 'word/_rels/document.xml.rels' '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rIdStyles" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
$archive.Dispose(); $stream.Dispose()
Write-Output $output
