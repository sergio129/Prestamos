# Script para iniciar un servidor web local con PowerShell
# Este script funciona incluso con políticas de ejecución restrictivas

Write-Host "Iniciando servidor web para la aplicación móvil..."
Write-Host "Asegúrate de haber ejecutado 'npm run copy-web' primero."

$wwwPath = Join-Path -Path $PSScriptRoot -ChildPath "..\www"
$port = 8000

# Verificar que la carpeta www existe
if (-not (Test-Path $wwwPath)) {
    Write-Host "Error: No se encuentra la carpeta www. Ejecuta 'npm run copy-web' primero." -ForegroundColor Red
    exit 1
}

# Crear un servidor web simple usando .NET
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
    Write-Host "Servidor iniciado en http://localhost:$port/"
    Write-Host "Presiona Ctrl+C para detener el servidor."

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $localPath = $request.Url.LocalPath
        $localPath = $localPath -replace "/", "\"
        if ($localPath -eq "\") {
            $localPath = "\index.html"
        }

        $filePath = Join-Path -Path $wwwPath -ChildPath $localPath.TrimStart("\")
        
        # Por defecto, usar UTF8 para text/html
        $response.ContentEncoding = [System.Text.Encoding]::UTF8
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            # Configurar el tipo MIME
            $extension = [System.IO.Path]::GetExtension($filePath)
            switch ($extension) {
                ".html" { $response.ContentType = "text/html" }
                ".css"  { $response.ContentType = "text/css" }
                ".js"   { $response.ContentType = "application/javascript" }
                ".json" { $response.ContentType = "application/json" }
                ".png"  { $response.ContentType = "image/png" }
                ".jpg"  { $response.ContentType = "image/jpeg" }
                ".gif"  { $response.ContentType = "image/gif" }
                ".svg"  { $response.ContentType = "image/svg+xml" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            $output = $response.OutputStream
            $output.Write($content, 0, $content.Length)
            $output.Close()
            
            Write-Host "200 OK: $($request.Url)" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $content = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado")
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
            $response.OutputStream.Close()
            
            Write-Host "404 Not Found: $($request.Url)" -ForegroundColor Yellow
        }
    }
}
catch {
    Write-Host "Error: $_" -ForegroundColor Red
}
finally {
    # Detener el servidor y liberar recursos
    if ($listener -ne $null) {
        $listener.Stop()
        $listener.Close()
    }
}
