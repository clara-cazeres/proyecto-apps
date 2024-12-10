import API_BASE_URL from "./apiConfig";

export const registrarUsuario = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al registrar usuario');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const iniciarSesion = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || 'Error al iniciar sesión');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const obtenerPerfilPorId = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/usuarios/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener el perfil del usuario');
  }

  return await response.json();
};
