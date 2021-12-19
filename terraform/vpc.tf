# vpc
resource "aws_vpc" "example" {
  cidr_block = "10.0.0.0/16"
  enable_dns_support = true # AWSのDNSサーバによる名前解決を有効化
  enable_dns_hostnames = true # VPC内のリソースにパブリックDNSホスト名を自動的に割り当て

  tags = {
    Name = "example"
  }
}

# サブネット
resource "aws_subnet" "public" {
  vpc_id = aws_vpc.example.id
  cidr_block = "10.0.0.0/24"
  map_public_ip_on_launch = true # 起動したインスタンスにパブリックIPアドレスを自動的に割り当て
  availability_zone = "ap-northeast-1a"
}

# インターネットゲートウェイ
resource "aws_internet_gateway" "example" {
  vpc_id = aws_vpc.example.id
}

# ルートテーブル
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.example.id

  tags = {
    Name = "public"
  }
}

# ルート
resource "aws_route" "public" {
  route_table_id = aws_route_table.public.id
  gateway_id = aws_internet_gateway.example.id
  destination_cidr_block = "0.0.0.0/0"
}

# ルートテーブルとの関連付け
resource "aws_route_table_association" "public" {
  subnet_id = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

# プライベートサブネット
resource "aws_subnet" "private" {
  vpc_id = aws_vpc.example.id
  cidr_block = "10.0.64.0/24"
  availability_zone = "ap-northeast-1a"
  map_public_ip_on_launch = false # プライベートサブネットではパブリックIPアドレスの割り当ては不要なのでfalseに設定する
}

# ルートテーブルとの関連付け
resource "aws_route_table" "private" {
  vpc_id = aws_vpc.example.id

  tags = {
    Name = "private"
  }
}

resource "aws_route_table_association" "private" {
  subnet_id = aws_subnet.private.id
  route_table_id = aws_route_table.private.id
}
