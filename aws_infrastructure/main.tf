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

output "eks_cluster_name" {
  value = aws_eks_cluster.prod_eks.name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.prod_bucket.bucket
}
