provider "aws" {
  region = var.region
}

resource "aws_s3_bucket" "prod_bucket" {
  bucket = var.s3_bucket_name
  acl    = "private"
}

resource "aws_eks_cluster" "prod_eks" {
  name     = var.eks_cluster_name
  role_arn = var.eks_role_arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }
}
resource "aws_ecr_repository" "prod_ecr" {
  name = "prod-app-ecr"
  image_tag_mutability = "MUTABLE"
  tags = {
    Environment = "production"
  }
}


output "eks_cluster_name" {
  value = aws_eks_cluster.prod_eks.name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.prod_bucket.bucket
}


output "ecr_repository_url" {
  value = aws_ecr_repository.prod_ecr.repository_url
}