json.extract! @video, :id, :uploader_id, :title, :description, :created_at, :views
json.extract! @video.uploader, :username
json.videoUrl url_for(@video.video)
json.thumbnailUrl url_for(@video.thumbnail)
json.publishDate @video.created_at.strftime("%b %d, %Y")
json.numLikes @video.num_likes
json.numDislikes @video.num_dislikes

json.comments do
    @video.comments.each do |comment|
        json.set! comment.id do
            json.extract! comment, :id, :body, :author_id, :video_id
            json.author comment.user.username
            json.createDate comment.created_at.strftime("%b %d, %Y")
        end
    end
end

if current_user
    user_like = @video.likes.select { |like| current_user.id == like.user_id }[0]

    json.userLike user_like
end
