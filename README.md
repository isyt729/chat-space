## Tables
- optionについて
  - null : trueの場合、NOT NULL制約を実装
  - unique : trueの場合、一意性制約を実装
  - foreign_key : trueの場合、外部キー制約を実装
  - add_index : trueの場合、インデックスを貼る 

### Users
|Column|Type|Options|

### Groups
|Column|Type|Options|
|------|----|-------|
|name|string|null: true|

### Users_Groups
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: true, unique : true, foreign_key: true|
|group_id|references|null: true, unique : true, foreign_key: true|

### Messages
|Column|Type|Options|
|------|----|-------|
|body|text|null: true|
|image|text||
|user_id|references|null: true, foreign_key: true|
|group_id|references|null: true, foreign_key: true|

## Association
### Usres 
- has_many :Messages
- has_many :Groups
- belongs_to :Users_Group

### Groups
- has_many :Messages
- belongs_to :Users_Group
- belongs_to :User

### Users_Groups
- belongs_to :User
- belongs_to :Group

### Messages
- belongs_to :User
- belongs_to :Group