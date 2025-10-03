output "eks_cluster_name" {
  value = aws_eks_cluster.prod_eks.name
}

output "s3_bucket_name" {
  value = aws_s3_bucket.prod_bucket.bucket
}
