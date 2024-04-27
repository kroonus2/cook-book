class RecipesController < ApplicationController
    #before_action :authorize_request, only: [ :create, :update, :get_books ]
    #before_action :get_auth_user

    def index
        @recipes = Recipe.where(status: "active")
        if @recipes.present?
            render json: { message: "Lista de Receitas ativas recuperadas com sucesso", recipes: @recipes }, status: :ok
        else
            render json: { message: "Não há receitas para exibir" }, status: :not_found
        end
    end

    def show
        @recipe = Recipe.find_by(params[:id])
        if @recipe && (@recipe.status == "active" || @recipe.status == "stored")
            render json: { message: "Receita encontrada com sucesso", recipe: @recipe }, status: :ok
          else
            render json: { message: "Receita não encontrada" }, status: :not_found
          end
        rescue ActiveRecord::RecordNotFound
          render json: { message: "Receita não encontrada" }, status: :not_found
    end

    def show_stored
        @recipes = Recipe.where(status: "stored")
        if @recipes.present?
            render json: { message: "Lista de Receitas armazenadas recuperadas com sucesso", recipes: @recipes }, status: :ok
        else
            render json: { message: "Não há receitas armazenadas para exibir" }, status: :not_found
        end
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
          render json: { message: "Receita excluida com sucesso" }, status: :ok
        else
          render json: { message: "Erro ao excluir receita", errors: @recipe.errors.full_messages }, status: :unprocessable_entity
        end
      rescue ActiveRecord::RecordNotFound
        render json: { message: "Receita não encontrada" }, status: :not_found
    end

    private 
    
    def recipe_params
        params.require(:recipe).permit(:name, :description, :instructions, :preparation_time, :difficulty, :user_id, :category_id, :status)
    end
end
