resource "aws_s3_bucket" "private" {
  bucket = "sample-ec-private-bucket"

  # バージョニングを有効にすることでいつでも以前のバージョンへ復元可能になる
  versioning {
    enable = true
  }

  # 暗号化を有効にするオプション
  # オブジェクト保存時に暗号化・参照時に復号するようになる
  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }
}

resource "aws_s3_bucket_public_access_block" "private" {
  bucket = aws_s3_bucket.private.id
  block_public_acls = true
  block_public_policy = true
  ignore_public_acls = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "public" {
  bucket = "sample-ec-public-bucket"

  cors_rule {
    # allowed_origins = ["https://example.com"]
    allowed_methods = ["GET"]
    allowed_headers = ["*"]
    max_age_seconds = 3000
  }
  
}
