resource "aws_lb" "example" {
  name = "example"
  load_balancer_type = "application" # albを指定
  internal = false # インターネット向けを指定
  idle_timeout = 60
  enable_deletion_protection = true # 削除保護を有効化

  subnets = [
    aws_subnet.public_0.id,
    aws_subnet.public_1.id,
  ]

  access_logs {
    bucket = aws_s3_bucket.alb_log.id
    enabled = true
  }

  security_groups = [
    module.http_sg.security_group_id,
    module.https_sg.security_group_id,
    module.http_redirect_sg.security_group_id,
  ]
}

output "alb_dns_name" {
  value = aws_lb.example.dns_name
}
