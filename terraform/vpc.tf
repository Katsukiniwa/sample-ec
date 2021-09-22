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

resource "aws_nat_gateway" "nat" {
  for_each = local.availability_zones

  allocation_id = aws_eip.nat[each.key].id
  subnet_id     = aws_subnet.public[each.key].id

  tags = {
    Name = "${local.name}-nat-${local.az_conf[each.key].short_name}"
  }

  depends_on = [aws_internet_gateway.igw]
}
