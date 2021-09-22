resource "aws_subnet" "public" {
  for_each = local.availability_zones

  vpc_id            = aws_vpc.main.id
  availability_zone = each.key
  cidr_block        = cidrsubnet(local.vpc_cidr, 8, local.az_conf[each.key].index)

  tags = {
    Name = "${local.name}-public-${local.az_conf[each.key].short_name}"
  }
}

resource "aws_subnet" "ecs" {
  for_each = local.availability_zones

  vpc_id            = aws_vpc.main.id
  availability_zone = each.key
  cidr_block        = cidrsubnet(local.vpc_cidr, 8, length(aws_subnet.public) + local.az_conf[each.key].index)

  tags = {
    Name = "${local.name}-ecs-${local.az_conf[each.key].short_name}"
  }
}

resource "aws_subnet" "rds" {
  for_each = local.availability_zones

  vpc_id            = aws_vpc.main.id
  availability_zone = each.key
  map_public_ip_on_launch = false
  cidr_block        = cidrsubnet(local.vpc_cidr, 8, length(aws_subnet.public) + length(aws_subnet.ecs) + local.az_conf[each.key].index)

  tags = {
    Name = "${local.name}-rds-${local.az_conf[each.key].short_name}"
  }
}

resource "aws_subnet" "codebuild" {
  for_each = local.availability_zones

  vpc_id            = aws_vpc.main.id
  availability_zone = each.key
  cidr_block        = cidrsubnet(local.vpc_cidr, 8, length(aws_subnet.public) + length(aws_subnet.ecs) + length(aws_subnet.rds) + local.az_conf[each.key].index)

  tags = {
    Name = "${local.name}-codebuild-${local.az_conf[each.key].short_name}"
  }
}
