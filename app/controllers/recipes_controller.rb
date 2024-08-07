class RecipesController < ApplicationController
  before_action :authorize_request, except: [:index]

  def index
    @recipes = Recipe.where(status: "active")
    if @recipes.present?
      render json: { message: "Lista de Receitas ativas recuperadas com sucesso", recipes: @recipes }, status: :ok
    else
      render json: { message: "Não há receitas para exibir" }, status: :not_found
    end
  end

  def show
    @recipe = Recipe.find_by(id: params[:id])
    if @recipe && (@recipe.status == "active" || @recipe.status == "stored")
      render json: { message: "Receita encontrada com sucesso", recipe: @recipe }, status: :ok
    else
      render json: { message: "Receita não encontrada" }, status: :not_found
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Receita não encontrada" }, status: :not_found
  end

  def show_user_recipes
    @recipes = Recipe.where(user_id: params[:user_id]).where.not(status: "deleted")
    if @recipes.present?
      render json: { message: "Lista de Receitas do usuário recuperadas com sucesso", recipes: @recipes }, status: :ok
    else
      render json: { message: "Não há receitas armazenadas para exibir" }, status: :not_found
    end
  end
  

  def show_stored_recipes
    @recipes = Recipe.where(user_id: params[:user_id], status: "stored")
    if @recipes.present?
      render json: { message: "Lista de Receitas armazenadas recuperadas com sucesso", recipes: @recipes }, status: :ok
    else
      render json: { message: "Não há receitas armazenadas para exibir" }, status: :not_found
    end
  rescue => e
    render json: { message: "Erro ao recuperar receitas armazenadas", error: e.message }, status: :internal_server_error
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.update(status: "active")
    if @recipe.save
      render json: { message: "Receita criada com sucesso", recipe: @recipe }, status: :created
    else
      render json: { message: "Erro ao criar Receita", errors: @recipe.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @recipe = Recipe.find(params[:id])
    if @recipe.update(recipe_params)
      render json: { message: "Receita atualizada com sucesso", recipe: @recipe }, status: :ok
    else
      render json: { message: "Erro ao atualizar receita", errors: @recipe.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Receita não encontrada" }, status: :not_found
  end

  def destroy
    @recipe = Recipe.find(params[:id])
    if @recipe.update(status: "deleted")
      render json: { message: "Receita excluída com sucesso" }, status: :ok
    else
      render json: { message: "Erro ao excluir receita", errors: @recipe.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Receita não encontrada" }, status: :not_found
  end

  def search
    query = params[:query]
    if query.present?
      @recipes = Recipe.where('name ILIKE ?', "%#{query}%")
      render json: { message: "Receitas encontradas", recipes: @recipes }, status: :ok
    else
      render json: { message: "Nenhum termo de pesquisa fornecido" }, status: :bad_request
    end
  end

  private 

  def recipe_params
    params.require(:recipe).permit(:name, :description, :instructions, :preparation_time, :difficulty, :user_id, :category_id)
  end
end
