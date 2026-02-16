# QA Technical Test

## Overview
This repository contains automated tests for Web UI (Swag Labs) and API (JSONPlaceholder) using Playwright and TypeScript.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Run `npx playwright install` to install browsers.

## How to Run Tests
* Run all tests: `npx playwright test`
* View Report: `npx playwright show-report`

## Project Structure
* `pages/`: Page Object Models for UI tests.
* `tests/ui/`: UI automation scripts.
* `tests/api/`: API automation scripts.


## Test Scenarios Covered

### 1. Web UI (Swag Labs)
| Type | Scenario | Description |
| **Positive** | **End-to-End Purchase** | Login -> Add to Cart -> Checkout -> Validate Success Message. |
| **Negative** | **Locked Out User** | Attempt login with `locked_out_user` and verify error message. |
| **Negative** | **Checkout Validation** | Attempt to continue checkout with empty fields to verify required field validation. |
| **Edge** | **Cart Persistence** | Add item, simulate session break, and verify item remains in cart. |
| **Edge** | **Navigation Flow** | Cancel checkout to verify user is returned to Cart with items intact. |

### 2. API (JSONPlaceholder)
| Type | Method | Description |
| :--- | :--- | :--- |
| **CRUD** | `POST` | Create a new post and validate the response body matches request data. |
| **CRUD** | `GET` | Retrieve the created post by ID and verify data persistence. |
| **CRUD** | `PATCH` | Partially update a post (title only) and verify other fields remain unchanged. |
| **CRUD** | `DELETE` | Delete the post and verify 200 OK status. |
| **Negative** | `GET` | Attempt to fetch a non-existent ID (e.g., `9999`) and verify `404 Not Found`. |
| **Edge** | `POST` | Send invalid payload types (boolean/numbers) to test API robustness. |

## CI/CD Status
This project uses GitHub Actions to run the full suite of 11 tests in a clean Ubuntu environment. This ensures code quality and state validation before any merge.