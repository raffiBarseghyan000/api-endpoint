let getCookieByName = (name) => {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2)
        return parts.pop().split(";").shift();
}

$('#loginForm').submit((event) => {
    event.preventDefault()
    const username = $('#username').val()
    const password = $('#password').val()
    $.ajax({
        contentType: 'application/json',
        data: JSON.stringify({
            "username": username,
            "password": password
        }),
        dataType: 'json',
        success: (data) => {
            document.cookie = `access_token=${data.token}`
            window.location = '/pages/main.html'
        },
        error: () => {
            alert("Wrong credentials");
        },
        url: '/login',
        type: 'POST'
    });
})

$('#getAllUsers').click(()=> {
    $.ajax({
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + getCookieByName("access_token")},
        dataType: 'json',
        success: (data) => {
            $(document).ready(() => {
                $('#multiList').html(data.map(single => {
                    return `<li>${single.username}</li>`
                }));
            })
        },
        error: (data) => {
            alert(data.statusText);
        },
        url: '/users',
        type: 'GET'
    });
})

$('#getAllEntities').click(()=> {
    $.ajax({
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + getCookieByName("access_token")},
        dataType: 'json',
        success: (data) => {
            $(document).ready(() => {
                $('#multiList').html(data.map(single => {
                    return `<li>${JSON.stringify(data)}</li>`
                }));
            })
        },
        error: (data) => {
            alert(data.statusText);
        },
        url: '/entries',
        type: 'GET'
    });
})

$('#userForm').submit((event)=> {
    event.preventDefault()
    const username = $('#username').val()
    const password = $('#userPassword').val()
    $.ajax({
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + getCookieByName("access_token")},
        data: JSON.stringify({
            "username": username,
            "password": password
        }),
        dataType: 'json',
        success: (data) => {
            alert(data.statusText)
        },
        error: (data) => {
            alert(data.statusText);
        },
        url: '/users',
        type: 'POST'
    });
})

$('#entryForm').submit((event)=> {
    event.preventDefault()
    const body = $('#entryBody').val()
    $.ajax({
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + getCookieByName("access_token")},
        data: body,
        dataType: 'json',
        success: (data) => {
            alert(data.statusText)
        },
        error: (data) => {
            alert(data.statusText);
        },
        url: '/entries',
        type: 'POST'
    });
})

$('#userDeleteForm').submit((event)=> {
    event.preventDefault()
    const username = $('#usernameForDelete').val()
    $.ajax({
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + getCookieByName("access_token")},
        dataType: 'json',
        success: (data) => {
            alert(data.statusText)
        },
        error: (data) => {
            alert(data.statusText);
        },
        url: `/users/${username}`,
        type: 'DELETE'
    });
})

$('#deleteEntity').click(()=> {
    $.ajax({
        contentType: 'application/json',
        headers: {"Authorization": "Bearer " + getCookieByName("access_token")},
        dataType: 'json',
        success: (data) => {
            $(document).ready(() => {
                alert(data.statusText);
            })
        },
        error: (data) => {
            alert(data.statusText);
        },
        url: '/entries',
        type: 'DELETE'
    });
})

