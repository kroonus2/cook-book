class AuthController < ApplicationController
    before_action :authorize_request, only: [:get_auth_user]

    def login 
        @user = User.find_by(email: params[:email])
        if @user&.authenticate(params[:password])
            token = JWT.encode(@user.id, nil, 'none')
            # Definir o token JWT no cabeçalho da resposta
            response.headers['Authorization'] = "Bearer #{token}"
            render json: {token: token}, status: :ok
        else
            render json: {error: "Email ou Senha incorretos, verifique e tente novamente!"}, status: :not_found
        end
    end
    ##Logout será feita no front end
    def get_auth_user
        @user = User.find(@current_user[:id])

        render json: {
            user: {
                id: @user[:id],
                name: @user[:name],
                email: @user[:email]
            }
        }
    end

end
