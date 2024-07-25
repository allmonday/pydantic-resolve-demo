from __future__ import annotations
from typing import Optional
from fastapi.routing import APIRoute
from fastapi import FastAPI
from pydantic import BaseModel
from pydantic_resolve import Resolver, build_list, build_object, LoaderDepend

# 1. loader functions
async def blog_to_comments_loader(blog_ids: list[int]):
    print(blog_ids)
    comments_table = [
        dict(id=1, blog_id=1, content='its interesting', user_id=1),
        dict(id=2, blog_id=1, content='i need more example', user_id=2),
        dict(id=3, blog_id=2, content='what problem does it solved?', user_id=2),
        dict(id=4, blog_id=2, content='interesting', user_id=1)]

    return build_list(comments_table, blog_ids, lambda c: c['blog_id'])

async def user_loader(user_ids: list[int]):
    print(user_ids)
    users = [
        dict(id=1, name='alice'),
        dict(id=1, name='john'),
    ]
    return build_object(users, user_ids, lambda c: c['id'])

async def get_blogs():
    return [
        dict(id=1, title='what is pydantic-resolve'),
        dict(id=2, title='what is composition oriented development pattarn'),
    ]


# 1. define base schemas
class Comment(BaseModel):
    id: int
    content: str

class Blog(BaseModel):
    id: int
    title: str
    user_id: int

class User(BaseModel):
    id: int
    name: str

# 2. inherit and extend from base schemas
class MyBlogSite(BaseModel):
    name: str
    blogs: list[MyBlog] = []
    async def resolve_blogs(self):
        return await get_blogs()

    comment_count: int = 0
    def post_comment_count(self):
        return sum([b.comment_count for b in self.blogs])

class MyBlog(Blog):
    comments: list[MyComment] = []
    def resolve_comments(self, loader=LoaderDepend(blog_to_comments_loader)):
        return loader.load(self.id)

    comment_count: int = 0
    def post_comment_count(self):
        return len(self.comments)

class MyComment(Comment):
    user: Optional[User] = None
    def resolve_user(self, loader=LoaderDepend(user_loader)):
        return loader.load(self.user_id)



def custom_generate_unique_id(route: APIRoute):
    return f"{route.name}"

app = FastAPI(generate_unique_id_function=custom_generate_unique_id)

@app.get("/my-site/{name}", response_model=MyBlogSite, tags=["main"])
async def read_my_site(name: str):
    site = MyBlogSite(name=name)
    return await Resolver().resolve(site)
