class ApplicationController < ActionController::API
  before_action :authorize_request
  
    def authorize_request
      header_token = request.headers['Authorization']
      if (header_token.present? && header_token.include?('Bearer '))
        token = header_token.split(' ').last
        Rails.logger.info "Received token: #{token}" # Registra o token nos logs do Rails
        begin
          @decoded_token = JWT.decode(token, nil, false).first
          Rails.logger.info "Decoded token: #{@decoded_token}" # Adicione esta linha para depuração
          @current_user = User.find(@decoded_token['user_id'])
        rescue JWT::DecodeError => e
          render json: { error: "Token inválido ou expirado", message: e.message }, status: :unauthorized
        end
      else
        render json: { error: "Token de autenticação não fornecido ou expirado!" }, status: :unauthorized
      end
    end
  end
  