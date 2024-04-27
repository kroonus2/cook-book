class IngredientsController < ApplicationController
  before_action :set_recipe
  before_action :set_ingredient, only: [:update, :destroy]
  
  def create
    @recipe = Recipe.find(params[:recipe_id])
    @ingredient = @recipe.ingredients.create(ingredient_params)
    render json: @ingredient, status: :created
  end

  def update
    @recipe = Recipe.find(params[:recipe_id])
    @ingredient = @recipe.ingredients.find(params[:id])
    if @ingredient.update(ingredient_params)
      render json: @ingredient, status: :ok
    else
      render json: @ingredient.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @recipe = Recipe.find(params[:recipe_id])
    @ingredient = @recipe.ingredients.find(params[:id])
    @ingredient.destroy
    head :no_content
  end

  private
    
    def ingredient_params
      params.require(:ingredient).permit(:name, :quantity, :unit, :notes)
    end
    
    def set_recipe
      @recipe = Recipe.find(params[:recipe_id])
    end

    def set_ingredient
      @ingredient = @recipe.ingredients.find(params[:id])
    end

end
