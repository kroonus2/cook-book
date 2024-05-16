class CategoriesController < ApplicationController
  before_action :authorize_request, except: [:index]

  def index
    @categories = Category.all
    if @categories.present?
      render json: { message: "Lista de categorias recuperadas com sucesso", categories: @categories }, status: :ok
    else
      render json: { message: "Não há categorias para exibir" }, status: :not_found
    end
  end

  def show
    @category = Category.find_by(params[:id])
    if @category
        render json: { message: "Categoria encontrada com sucesso", category: @category }, status: :ok
      else
        render json: { message: "Categoria não encontrada" }, status: :not_found
      end
    rescue ActiveRecord::RecordNotFound
      render json: { message: "Categoria não encontrada" }, status: :not_found
  end

  def create
    @category = Category.new(category_params)
    if @category.save
      render json: { message: "Categoria criada com sucesso", category: @category }, status: :created
    else
      render json: { message: "Erro ao criar Categoria", errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @category = Category.find(params[:id])
    if @category.update(category_params)
      render json: { message: "Categorias atualizada com sucesso", category: @category }, status: :ok
    else
      render json: { message: "Erro ao atualizar Categorias", errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound
    render json: { message: "Categorias não encontrada" }, status: :not_found
  end
  
  private 
    def category_params
      params.require(:category).permit(:name, :description)
    end

end
