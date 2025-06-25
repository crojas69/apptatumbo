namespace App\Http\Controllers;

use App\Models\SiteSurvey;
use App\Models\VisitApproval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    // Método para manejar la carga de la imagen
    public function upload(Request $request)
    {
        // Validar que la imagen esté presente y sea válida
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Almacenar la imagen en la carpeta 'images' dentro de storage/app/public
        $imagePath = $request->file('image')->store('images', 'public');

        // Obtener la URL pública de la imagen
        $imageUrl = Storage::url($imagePath);

        // Obtener el tipo de formulario
        $formType = $request->input('formType');

        // Llamar a la función para guardar la URL en la base de datos según el tipo de formulario
        return $this->saveImageUrl($imageUrl, $formType);
    }

    // Método para guardar la URL de la imagen en la base de datos
    public function saveImageUrl($imageUrl, $formType)
    {
        // Dependiendo del tipo de formulario, guardamos la URL en la tabla correspondiente
        if ($formType === 'site-survey') {
            // Guardar en la tabla site_surveys
            $siteSurvey = new SiteSurvey();
            $siteSurvey->homes_photo = $imageUrl;  // Guardamos la URL en la columna correspondiente
            $siteSurvey->save();

            return response()->json(['message' => 'URL guardada en site_surveys correctamente'], 200);
        } elseif ($formType === 'visit-approval') {
            // Guardar en la tabla visit_approvals
            $visitApproval = new VisitApproval();
            $visitApproval->homes_photo = $imageUrl;  // Guardamos la URL en la columna correspondiente
            $visitApproval->save();

            return response()->json(['message' => 'URL guardada en visit_approvals correctamente'], 200);
        } else {
            return response()->json(['message' => 'Tipo de formulario no válido'], 400);
        }
    }
}
