class CreateIngredients < ActiveRecord::Migration[7.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.float :quantity
      t.string :unit
      t.text :notes
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
