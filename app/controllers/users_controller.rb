class UsersController < ApplicationController

  def index
    users = User.where(active: true)
    if users.present?
      render json: { message: "Lista de usuários recuperada com sucesso", users: users }, status: :ok
    else
      render json: { message: "Não há usuários para exibir" }, status: :not_found
    end
  end

  def show
    @user = User.find(params[:id])
    if @user.active
      render json: { message: "Usuário encontrado com sucesso", user: @user }, status: :ok
    else
      render json: { message: "Usuário não encontrado" }, status: :not_found
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Usuário não encontrado" }, status: :not_found
  end
  
  def create
    @user = User.new(user_params)
    @user.update(active: true)
    if @user.save
      render json: { message: "Usuário criado com sucesso", user: @user }, status: :created
    else
      render json: { message: "Erro ao criar usuário", errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_update_params.except(:password, :password_confirmation))
      render json: { message: "Usuário atualizado com sucesso", user: @user }, status: :ok
    else
      render json: { message: "Erro ao atualizar usuário", errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Usuário não encontrado" }, status: :not_found
  end

  def change_password
    @user = User.find(params[:id])
    if @user.update(change_password_params)
      render json: { message: "Senha do usuário alterada com sucesso", user: @user }, status: :ok
    else
      render json: { message: "Erro ao alterar senha do usuário", errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Usuário não encontrado" }, status: :not_found
  end

  def destroy
    @user = User.find(params[:id])
    if @user.update(active: false)
      render json: { message: "Usuário desativado com sucesso" }, status: :ok
    else
      render json: { message: "Erro ao desativar usuário", errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Usuário não encontrado" }, status: :not_found
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :bio, :website)
  end

  def user_update_params
    params.require(:user).permit(:name, :email, :bio, :website)
  end

  def change_password_params
    params.require(:user).permit(:password, :password_confirmation)
  end

end
