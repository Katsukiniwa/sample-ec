resource "aws_vpc" "main" {
  cidr_block = local.vpc_cidr
  
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${local.name}-main"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${local.name}-igw"
  }
}
