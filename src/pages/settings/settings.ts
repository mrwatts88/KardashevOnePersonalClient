import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { NavController, NavParams } from 'ionic-angular'
import { Settings } from '../../providers/settings/settings'
import { UserProvider } from '../../providers/user/user'
import { PopoverController } from 'ionic-angular'
import { PopoverPage } from '../popover/popover'
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  options: any
  settingsReady = false
  form: FormGroup
  page: string = 'main'
  pageTitleKey: string = 'SETTINGS_TITLE'
  pageTitle: string
  subSettings: any = SettingsPage

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  }

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public translate: TranslateService,
    public userProvider: UserProvider,
    public popoverCtrl: PopoverController) {
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage)
    popover.present({
      ev: myEvent
    })
  }

  _buildForm() {
    let group: any = {
      option1: [this.options.option1],
      option2: [this.options.option2],
      option3: [this.options.option3]
    }

    switch (this.page) {
      case 'main':
        break
      case 'profile':
        group = {
          option4: [this.options.option4]
        }
        break
    }
    this.form = this.formBuilder.group(group)

    // Watch the form for changes
    this.form.valueChanges.subscribe(() => this.settings.merge(this.form.value))
  }

  ionViewDidLoad() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({})
  }

  ionViewWillEnter() {
    // Build an empty form for the template to render
    this.form = this.formBuilder.group({})
    this.page = this.navParams.get('page') || this.page
    this.pageTitleKey = this.navParams.get('pageTitleKey') || this.pageTitleKey
    this.translate.get(this.pageTitleKey).subscribe(res => this.pageTitle = res)

    this.settings.load().then(() => {
      this.settingsReady = true
      this.options = this.settings.allSettings
      this._buildForm()
    })
  }

  ngOnChanges() { }

  logout() {
    this.userProvider.logout().then(() => {
    }).catch(() => {
      console.log("Could not log out")
    })
  }
}