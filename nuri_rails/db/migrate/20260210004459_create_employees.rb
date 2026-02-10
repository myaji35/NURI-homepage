class CreateEmployees < ActiveRecord::Migration[8.1]
  def change
    create_table :employees do |t|
      t.string :name
      t.string :resident_number
      t.text :address
      t.string :phone
      t.string :email
      t.string :disability_type
      t.integer :disability_grade
      t.date :hire_date
      t.string :position
      t.decimal :salary
      t.string :status

      t.timestamps
    end
  end
end
