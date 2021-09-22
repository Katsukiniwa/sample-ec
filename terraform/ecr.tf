resource "aws_ecr_repository" "express" {
  name = "${local.name}-express"

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "AES256"
  }
}
