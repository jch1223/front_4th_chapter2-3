import { Input, Textarea } from "../../../shared/ui"
import { CreatePostParams } from "../api/postApi"
import { Post } from "../model/types"

export interface PostFormProps {
  post: CreatePostParams["body"]
  onChange: (post: Pick<Post, "title" | "body" | "userId">) => void
}

export const PostForm = ({ post, onChange }: PostFormProps) => {
  return (
    <div className="space-y-4">
      <Input placeholder="제목" value={post.title} onChange={(e) => onChange({ ...post, title: e.target.value })} />
      <Textarea
        rows={30}
        placeholder="내용"
        value={post.body}
        onChange={(e) => onChange({ ...post, body: e.target.value })}
      />
      <Input
        type="number"
        placeholder="사용자 ID"
        value={post.userId}
        onChange={(e) => onChange({ ...post, userId: Number(e.target.value) })}
      />
    </div>
  )
}
