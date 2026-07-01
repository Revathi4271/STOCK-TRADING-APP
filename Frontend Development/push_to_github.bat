@echo off
echo ===================================================
echo Pushing STOCK-TRADING-APP to GitHub...
echo ===================================================
echo.
echo NOTE: A login prompt will open asking you to sign in as "Revathi4271".
echo Please sign in with the account "Revathi4271" or use a Personal Access Token for "Revathi4271".
echo.
"C:\Users\laksh\AppData\Local\GitHubDesktop\app-3.5.0\resources\app\git\cmd\git.exe" push origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo [+] SUCCESS: The code has been successfully pushed to https://github.com/Revathi4271/STOCK-TRADING-APP.git
) else (
    echo.
    echo [-] ERROR: Push failed.
    echo Please make sure you entered the correct password or Personal Access Token for "Revathi4271".
)
echo.
pause
