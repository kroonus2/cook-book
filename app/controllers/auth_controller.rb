class AuthController < ApplicationController
    before_action :authorize_request, only: [:get_auth_user]

    def login 
        @user = User.find_by(email: params[:email])
        if @user&.authenticate(params[:password])
        exp = Time.now.to_i + 4 * 3600
        exp_payload = { user_id: @user.id, exp: exp }

        token = JWT.encode(exp_payload, nil, 'none')
        render json: { token: token }, status: :ok
        else
        render json: { error: "Email ou Senha incorretos, verifique e tente novamente!" }, status: :not_found
        end
    end

    def get_auth_user
        render json: { user: @current_user }
    end
end
      