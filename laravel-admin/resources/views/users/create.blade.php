@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Crear Usuario</h2>
    <form action="{{ route('users.store') }}" method="POST">
        @csrf
        <div class="form-group mb-2">
            <label>Nombre</label>
            <input type="text" name="name" class="form-control" required />
        </div>
        <div class="form-group mb-2">
            <label>Email</label>
            <input type="email" name="email" class="form-control" required />
        </div>
        <div class="form-group mb-2">
            <label>Contraseña</label>
            <input type="password" name="password" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-success">Guardar</button>
    </form>
</div>
@endsection
