# СУБД:
Используемая СУБД postgreSQL

Структура базы данных имеет слудующий вид:

Таблица пользователей `users`
<table>
<tr>
<td>id</td><td>name</td><td>mail</td><td>password</td><td>created_at</td><td>avatar</td><td>phone</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>timestamp with time zone DEFAULT CURRENT_TIMESTAMP</td>
<td>text</td>
<td>text</td>
</tr>
  </table>

Таблица текущих сессий `sessions`
<table>
<tr>
<td>id</td><td>user_id</td><td>ip</td><td>os</td><td>browser</td><td>user_agent</td>
<td>refresh_token</td><td>expired_at</td><td>created_at</td><td>name</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>bigint NOT NULLL REFERENCES users (id)</td>
<td>cidr NOT NULL</td>
<td>text</td> 
<td>text</td>
<td>text</td>
<td>text</td>
<td>timestamp with time zone</td>
<td>timestamp with time zone</td>
<td>text</td>
</tr>
</table>

Таблица всех продуктов - книг `books`
<table>
<tr>
<td>id</td><td>user_id</td><td>title</td><td>author</td><td>description</td><td>cover</td>
<td>price</td><td>created_at</td><td>rating</td><td>category</td><td>sale</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>bigint NOT NULLL REFERENCES users (id)</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>text NOT NULL</td>
<td>money NOT NULL</td>
<td>timestamp with time zone DEFAULT CURRENT_TIMESTAMP</td>
<td>real</td>
<td>text</td>
<td>boolean DEFAULT false</td>
</tr>
</table>

Таблица отзывов - комментариев `comments`
<table>
<tr>
<td>id</td><td>book_id</td><td>text</td><td>created_at</td>
<td>is_read</td><td>author_name</td><td>rating</td>
</tr>
<tr>
<td>SERIAL PRIMARY KEY</td>
<td>bigint REFERENCES books (id) ON DELETE CASCADE</td>
<td>text NOT NULL</td>
<td>timestamp with time zone DEFAULT CURRENT_TIMESTAMP</td>
<td>boolean DEFAULT false</td>
<td>text</td>
<td>smallint</td>
</tr>
</table>

Таблица избранных товаров `favorites`
<table>
<tr>
<td>book_id</td><td>user_id</td><td>id</td>
</tr>
<tr>
<td>bigint REFERENCES books (id) ON DELETE CASCADE</td>
<td>bigint REFERENCES users (id) ON DELETE CASCADE</td>
<td>SERIAL PRIMARY KEY</td>
</tr>
</table>

# Описание:

При регистрации введенные данные с клиента проверяются на наличие аналогичных данных в БД в таблице `users`. Если соответсвий не обнаруженно то создается новый пользователь. (server\components\registration.js)

При входе в лк пользователь вводит данные, на сервере проверяются пароль и логин. 
В случае соответствия проводится проверка на наличие уже имеющейся сессии с данным пользователем в таблице `sessions`, если сессия имеется то она удалается и создается новая сессия, т.к количество возможных сессий одна и на клиент отправляется `token` и `refresh_token`. (server\components\authentication.js)

При каждом защищенном запросе отправляються два токена, т.к проверка на соответствие проводиться на стороне сервера (server\components\authorization.js)

В ЛК пользователь имеет возможность:
<ul>
<li>добавить аватар (src\components\profile\profileElements\Avatar.js)</li>
<li>"выставить на продажу" книги т.е добавить (src\components\profile\profileElements\myBooks):
<ul>
<li>обложку</li>
<li>описание</li>
<li>название</li>
<li>цену</li>
<li>автора</li>
</ul>
</li>
<li>Просмотреть выставленные "на продажу" книги (src\components\profile\profileElements\myBooks\MyBookList.js)</li>
<li>Посмотреть новинки добавленные в течении последних 24ч (src\components\profile\mainBoard)</li>
<li>Увидеть отзывы оставленные под добавленными книгами
(src\components\profile\mainBoard)</li>
<li>Просмотреть избранные товары / удалить из избранных (src\components\profile\profileElements\favorites)</li>
</ul>

### Карточка продукта - книги

В карточке продукта - книги (src\components\bookCard) имеется возможность ознакомиться c:
<ul>
<li>описанием (src\components\bookCard\BookInfo.js)</li>
<li>рейтингом (src\components\bookCard\BookRating.js)</li>
<li>отзывами (src\components\commentBlock)</li>
</ul>

##### Функционал

<ul>
<li> добавить необходимое количестов товара в корзину (src\components\bookCard\PriceInfo.js)</li>
<li>добавить в избранное</li>
<li> оставить отзыв и рейтинг (src\components\comments)</li>
</ul>

### Главная страница

<ul>
<li>Поиск по имеющимся товарам (src\components\header\header_mid)</li>
<li>Фильтр по категориям (src\components\book_list\listFilter\filterComponents\CategoryFilter.js)</li>
<li>Фильтр по цене (src\components\book_list\listFilter\filterComponents\CustomFilter.js)</li>
<li>Сортировка по (src\components\book_list\products\top\Sort.js):
<ul>
<li>Умолчанию ("Сортируется по дате добавления")</li>
<li>По цене</li>
<li>По названию</li>
<li>По Автору</li>
</ul>
</li>
<li>По возрастанию - убыванию</li>
</ul>

## Корзина (src\components\cart)

## Основные страницы:

Главная страница (src\components\pages\MainPage.js)

Страница профиля (src\components\pages\MainProfile.js)

Корзина (src\components\pages\Cart.js)

Карточка продукта (src\components\pages\MainBookCard.js)

