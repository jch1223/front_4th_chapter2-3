import { useMutation, useQueryClient } from "@tanstack/react-query"
import { commentsApi, CommentsTypes, CreateCommentParams } from "../commentsApi"
import { Comment } from "../../model/types"
import { commentsQueryKeys } from "./commentsQueryKeys"
import { Post } from "../../../post/model/types"

export const useLikeCommentMutation = (postId: Post["id"]) => {
  const queryClient = useQueryClient()
  const queryKey = commentsQueryKeys.lists(postId)

  return useMutation({
    mutationFn: (comment: Comment) => commentsApi.likeComment(comment),
    onMutate: async (updatedComment) => {
      const previousComments = queryClient.getQueryData(queryKey)

      queryClient.setQueryData(queryKey, (old: CommentsTypes) => {
        return {
          ...old,
          comments: old.comments.map((comment) =>
            comment.id === updatedComment.id ? { ...updatedComment, likes: comment.likes + 1 } : comment,
          ),
        }
      })

      return { previousComments }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export const useDeleteCommentMutation = (postId: Post["id"]) => {
  const queryClient = useQueryClient()
  const queryKey = commentsQueryKeys.lists(postId)

  return useMutation({
    mutationFn: (commentId: Comment["id"]) => commentsApi.deleteComment(commentId),
    onMutate: async () => {
      const previousComments = queryClient.getQueryData(queryKey)
      return { previousComments }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export const useUpdateCommentMutation = (postId: Post["id"]) => {
  const queryClient = useQueryClient()
  const queryKey = commentsQueryKeys.lists(postId)

  return useMutation({
    mutationFn: (comment: Comment) => commentsApi.updateComment(comment),
    onMutate: async (previousComments) => {
      return { previousComments }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}

export const useCreateCommentMutation = (postId: Post["id"]) => {
  const queryClient = useQueryClient()
  const queryKey = commentsQueryKeys.lists(postId)

  return useMutation({
    mutationFn: (comment: CreateCommentParams["body"]) => commentsApi.createComment(comment),
    onMutate: async () => {
      const previousComments = queryClient.getQueryData(queryKey)
      return { previousComments }
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(queryKey, context?.previousComments)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
    },
  })
}
