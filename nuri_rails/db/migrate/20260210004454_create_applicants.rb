class CreateApplicants < ActiveRecord::Migration[8.1]
  def change
    create_table :applicants do |t|
      t.string :name
      t.string :disability_type
      t.integer :disability_grade
      t.string :contact
      t.string :email
      t.text :address
      t.string :status
      t.text :resume

      t.timestamps
    end
  end
end
