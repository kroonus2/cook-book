class ApplicationController < ActionController::API
    def authorize_request
        header_token = request.headers['Authorization']
        if header_token.present? && header_token.include?('Bearer ')
            token = header_token.split(' ').last
            begin
                @decoded_token = JWT.decode(token, nil, 'none').first
                @current_user = User.find(@decoded_token['user_id'])
            rescue JWT::VerificationError, JWT::DecodeError
                render json: { error: "Token inválido ou expirado" , token: token}, status: :unauthorized
            end
        else
            render json: { error: "Token de autenticação não fornecido" }, status: :unauthorized
        end
    end
end
