# Branch Protection Rules for `main` (or `master`)

To enforce that all changes to the `main` branch go through a pull request and prevent direct commits:

1. Go to your repository on GitHub.
2. Click **Settings** > **Branches** > **Branch protection rules**.
3. Click **Add rule**.
4. Set **Branch name pattern** to `main` (or `master`).
5. Enable these options:
   - ✅ Require a pull request before merging
   - ✅ Require approvals (set number as needed)
   - ✅ Require status checks to pass before merging (optional)
   - ✅ Restrict who can push to matching branches (optional)
   - ✅ Do not allow bypassing the above settings
6. Save changes.

**Result:**  
- Direct commits to `main` (or `master`) are blocked.
- All changes must go through a pull request and review.
