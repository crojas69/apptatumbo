@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Usuarios</h2>
    <a href="{{ route('users.create') }}" class="btn btn-primary mb-3">Crear Usuario</a>
    <table class="table table-bordered">
        <thead><tr><th>Nombre</th><th>Email</th></tr></thead>
        <tbody>
            @foreach($users as $user)
            <tr><td>{{ $user->name }}</td><td>{{ $user->email }}</td></tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
