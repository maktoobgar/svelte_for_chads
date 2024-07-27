import os
import sys
import shutil
from typing import Callable

Reset = "\033[0m"
Red = "\033[31m"
Green = "\033[32m"
Yellow = "\033[33m"
Blue = "\033[34m"
Purple = "\033[35m"
Cyan = "\033[36m"
Orange = "\033[33m"
Gray = "\033[37m"
White = "\033[97m"

i = 1

############! Change My Name
SERVICE_NAME = "svelte_for_chads"

CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))
TARGET_DIR = f"/usr/share/{SERVICE_NAME}"
SERVICE_FILE_ADDR = f"/etc/systemd/system/{SERVICE_NAME}.service"


def _print_started_action(started_text: str):
    global i
    print(f"\n{i} {Green}======{Reset} {Blue}{started_text}{Reset} {Green}======{Reset}\n")
    i += 1


def _print_failed_action(failed_text: str):
    print(f"\n{Orange}======{Reset} {Red}{failed_text}{Reset} {Orange}======{Reset}")
    print(
        f"\n{Orange}======{Reset} {Red}Whole Process Failed{Reset} {Orange}======{Reset}"
    )
    sys.exit(1)


def _print_final_success_print():
    print(f"\n{Green}====== Process finished successfully ======{Reset}\n")

def _if_failed_print_failed_action(code: int, failed_text: str):
    if code != 0:
        _print_failed_action(failed_text)

def action(operation: Callable[[], int], start_text: str):
    _print_started_action(start_text)
    _if_failed_print_failed_action(operation(), f"Failed to {start_text}")

##########################################################################################

def main():
    if os.geteuid() != 0:
        _print_failed_action("We need root access, run with 'sudo' please")

    # Create TARGET_PATH and remove if exists and recreate
    if not os.path.exists(TARGET_DIR):
        os.mkdir(TARGET_DIR)
    else:
        shutil.rmtree(TARGET_DIR)
        os.mkdir(TARGET_DIR)

    # Install Requirements
    action(lambda: os.system("npm i"), "Install Requirements")

    # Create Virtual Env If not Found
    if not os.path.isfile(f".env"):
        os.system("cp .env.example .env")

    # Build Process
    action(lambda: os.system("npm run build"), "Build Project")

    # Deploy Process
    action(lambda: os.system("docker compose down && docker compose up -d"), "Host Project")

if __name__ == "__main__":
    main()
    _print_final_success_print()
