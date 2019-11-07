## Tables
- optionについて
  - null : NOT NULL制約を実装
  - foreign_key : 外部キー制約を実装
  - add_index : インデックスを貼る 

### Users
|Column|Type|Options|
|------|----|-------|
|name|string|null:false,index: true|


### Groups
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|

### Users_Groups
|Column|Type|Options|
|------|----|-------|
|user|references|null:false, foreign_key: true|
|group|references|null:false, foreign_key: true|


### Messages
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|text||
|user|references|null:false, foreign_key: true|
|group|references|null:false, foreign_key: true|


## Association
### Usres 
- has_many :Messages
- has_many :Groups, through: :Users_Groups
- has_many :Users_Groups


### Groups
- has_many :Messages
- has_many :Users, through: :Users_Groups
- has_many :Users_Groups

### Users_Groups
- belongs_to :User
- belongs_to :Group

### Messages
- belongs_to :User
- belongs_to :Group