# Add Terraform + AWS Infrastructure

## 1. Add packages to devbox.json

```bash
devbox add opentofu awscli2 tflint
```

For Nix users, add to `flake.nix` devShell packages:
```nix
opentofu
awscli2
tflint
```

OpenTofu is recommended over Terraform for new projects (MPL-2.0 → BSL license change).

## 2. Set up infra/ directory

```
infra/
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── terraform.tfvars
│   └── prod/
│       ├── main.tf
│       ├── variables.tf
│       └── terraform.tfvars
├── modules/
│   └── (shared modules)
└── backend.tf
```

## 3. Create initial backend config

`infra/backend.tf`:
```hcl
terraform {
  required_version = ">= 1.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    # Configure per environment in environments/*/main.tf
  }
}
```

## 4. Update justfile

Add infrastructure recipes:

```just
# Plan infrastructure changes
tf-plan env="dev":
    cd infra/environments/{{env}} && tofu plan

# Apply infrastructure changes
tf-apply env="dev":
    cd infra/environments/{{env}} && tofu apply

# Lint Terraform files
tf-lint:
    tflint --recursive --chdir=infra/
```

Update the `lint` recipe to include Terraform:
```just
lint:
    # ... existing language lint ...
    tflint --recursive --chdir=infra/
```

## 5. Update lefthook.yml

Add Terraform formatting check:

```yaml
pre-commit:
  commands:
    # ... existing commands ...
    tofu-fmt:
      glob: "*.tf"
      run: tofu fmt -check -diff {staged_files}
```

## 6. Add to .gitignore

```
# Terraform
*.tfstate
*.tfstate.*
.terraform/
*.tfvars
!*.tfvars.example
crash.log
override.tf
override.tf.json
*_override.tf
*_override.tf.json
```

## 7. Update AGENTS.md

Add to the Architecture section:
```markdown
## Infrastructure

- IaC: OpenTofu (Terraform-compatible)
- Cloud: AWS
- Structure: `infra/environments/{dev,prod}/` with shared `infra/modules/`
- State: S3 backend (per environment)
```

Add to the Security section:
```markdown
- Never commit .tfvars files with real values — use .tfvars.example as templates
- Use IAM roles, not access keys, for CI/CD
```
