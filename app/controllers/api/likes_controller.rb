class Api::LikesController < ApplicationController

   before_action :require_signed_in!, only: [:create, :update, :destroy]

   def create
      @like = Like.new(like_params)
      @like.user_id = current_user.id

      if @like.save
         render :show
      else
         render json: @like.errors.full_messages, status: 422
      end
   end

   def update
      @like = Like.find(params[:id])

      if @like.update_attributes(update_like_params)
         render :show
      else
         render json: @like.errors.full_messages, status: 422
      end
   end

   def destroy
      @like = Like.find(params[:id])

      @like.destroy
      render json: {}
   end

   private

   def like_params
      params.require(:like).permit(:user_id, :video_id, :liked)
   end

   def update_like_params
      params.require(:like).permit(:liked)
   end

end
