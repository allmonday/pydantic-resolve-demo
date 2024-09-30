from __future__ import annotations
from typing import Optional
from fastapi.routing import APIRoute
from fastapi import FastAPI
from pydantic import BaseModel
from pydantic_resolve import Resolver, build_list, build_object, LoaderDepend


# 0. init app
def custom_generate_unique_id(route: APIRoute):
    return f"{route.name}"

app = FastAPI(generate_unique_id_function=custom_generate_unique_id)

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
        dict(id=2, name='john'),
    ]
    return build_object(users, user_ids, lambda c: c['id'])

async def get_blogs():
    return [
        dict(id=1, title='what is pydantic-resolve'),
        dict(id=2, title='what is composition oriented development pattarn'),
    ]

# 1. define base schemas, dict returned from loader can be automatically converted to pydantic schema
class Comment(BaseModel):
    id: int
    content: str
    user_id: int

class Blog(BaseModel):
    id: int
    title: str

class User(BaseModel):
    id: int
    name: str


# 2. inherit and extend from base schemas, progressively extend fields, from simple to complex

# ---------------- sample 1 --------------------
class MyBlogSite1(BaseModel):
    name: str
    blogs: list[Blog] = []
    async def resolve_blogs(self):
        return await get_blogs()

@app.get("/my-site-1/{name}", response_model=MyBlogSite1, tags=["module_a"])
async def read_my_site_1(name: str):
    site = MyBlogSite1(name=name)
    return await Resolver().resolve(site)


# ---------------- sample 2 --------------------
class MyBlog2(Blog):
    comments: list[Comment] = []
    def resolve_comments(self, loader=LoaderDepend(blog_to_comments_loader)):
        return loader.load(self.id)

class MyBlogSite2(BaseModel):
    name: str
    blogs: list[MyBlog2] = []
    async def resolve_blogs(self):
        return await get_blogs()


@app.get("/my-site-2/{name}", response_model=MyBlogSite2, tags=["module_b"])
async def read_my_site_2(name: str):
    site = MyBlogSite2(name=name)
    return await Resolver().resolve(site)
    

# ---------------- sample 3 --------------------
class MyBlogSite3(BaseModel):
    name: str
    blogs: list[MyBlog3] = []
    async def resolve_blogs(self):
        return await get_blogs()

class MyBlog3(Blog):
    comments: list[MyComment3] = []
    def resolve_comments(self, loader=LoaderDepend(blog_to_comments_loader)):
        return loader.load(self.id)


class MyComment3(Comment):
    user: Optional[User] = None
    def resolve_user(self, loader=LoaderDepend(user_loader)):
        return loader.load(self.user_id)


@app.get("/my-site-3/{name}", response_model=MyBlogSite3, tags=["module_c"])
async def read_my_site_3(name: str):
    site = MyBlogSite3(name=name)
    return await Resolver().resolve(site)
