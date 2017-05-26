using Android.App;
using Android.Widget;
using Android.OS;
using Amazon.Lambda;
using Amazon.Lambda.Model;
using Amazon;
using System.Threading.Tasks;

namespace OpenGarage3
{
    [Activity(Label = "OpenGarage3", MainLauncher = true, Icon = "@drawable/icon")]
    public class MainActivity : Activity {
        int count = 0;
        protected override void OnCreate(Bundle bundle)
        {
            base.OnCreate(bundle);

            //Set our view from the "main" layout resource
            SetContentView (Resource.Layout.Main);
            Button button = this.FindViewById<Button>(Resource.Id.OpenGarage);
            button.Click += OpenGarage_Click;
        }

        private async Task OpenGarageTask(Button button) {
            AmazonLambdaClient client = new AmazonLambdaClient("AKIAJ4WYXXKL3OVIPSGQ", "pPgQGryEOC+nGZvbyqx4LwFv/6i/oRwG/8vbFeom", RegionEndpoint.USEast1);
            InvokeRequest request     = new InvokeRequest();
            request.FunctionName      = "activateGarageDoor";
            InvokeResponse response   = await client.InvokeAsync(request);
            count++;
            button.Text = "Status: " + response.StatusCode.ToString() + " - " + count.ToString();
        }

        private void OpenGarage_Click(object sender, System.EventArgs e) {
            OpenGarageTask((Button)sender);
        }
    }
}

