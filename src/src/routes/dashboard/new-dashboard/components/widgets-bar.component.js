import React from 'react';
import { browserHistory } from 'react-router'
import widgetType from '../../../../lib/enums/widget-type.enum'
import ResponseStatusEnum from '../../../../lib/enums/response-status-enum'
import "../../../../../node_modules/react-grid-layout/css/styles.css"
import "../../../../../node_modules/react-resizable/css/styles.css"
import { Modal, Effect } from '../../../../components/react-dynamic-modal';
import { ModalManager as ModalManager, ModalManager as SaveAsModalManager } from '../../../../components/react-dynamic-modal';
import CustomModalPopUp from '../../../../components/custom-modal-popup/custom-modal-popup';



export default class WidgetsBar extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			...props,
			id: props.params.id
		}
		this.handleDocks = this.handleDocks.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			...nextProps
		})
	}


	showSaveAsModalPopup() {
		this.props.SaveAsPopUpAction();
	}

	componentDidUpdate() {

		if (this.props.newDashboard.showSaveAsModalPopup) {
			SaveAsModalManager.open(<CustomModalPopUp title={this.props.l.t('Save_As_Dashboard', 'Save As Dashboard')} {...this.props}
				okButtonText={this.props.l.t('Save_As', 'Save As')} placeholder="Dashboard Name"
				onRequestClose={this.OnSaveAsCancel.bind(this)}
				SaveClick={(name) => { this.saveAsDashboard(name) }}
				OnCancel={() => { this.OnSaveAsCancel(); }}

			/>);
		}

		if (this.props.newDashboard.showModalPopup) {
			ModalManager.open(<CustomModalPopUp title={this.props.l.t('Save_Dashboard', 'Save Dashboard')} {...this.props}
				okButtonText={this.props.l.t('Save', 'Save')} placeholder="Dashboard Name"
				onRequestClose={(input) => { this.onRequestClose(input) }}
				SaveClick={(name) => { this.saveDashboard(name) }}
				OnCancel={() => { this.OnCancel() }}

			/>);
		}
	}



	OnCancel() {
		this.props.UpdateDashboardProperty("name", '')
		this.props.HandleModalPopup(false);
		ModalManager.close();
	}


	saveDashboard(name, isNameFromStore) {
		//this.props.UpdateDashboardProperty("name", name);
		this.handleDocks();
		this.props.HandleModalPopup(false);
		this.props.newDashboard.Id ? this.props.UpdateDashboard(name, false) : this.props.SaveDashboard(name, false)
		ModalManager.close();
	}

	saveAndExitClick(moveToFilesPage) {
		this.handleDocks();
		this.props.UpdateAction('Save_and_exit');
		this.props.newDashboard.Id ? this.props.UpdateDashboard() : this.props.SaveDashboard();

	}

	onRequestClose(input) {
		this.props.HandleModalPopup(false);
		this.props.UpdateDashboardProperty("name", '')
		ModalManager.close();
	}

	showEditConfirmation() {
		const configs = {
			type: ResponseStatusEnum.Custom,
			messages: [this.props.l.t('Are_you_sure_you_want_to_discard_the_changes', 'Are you sure you want to discard the changes?')],
			func: {
				onOk: () => { this.props.ResetDashboard(); browserHistory.push(`/dashboard/mydashboards`) },
				onCancel: () => { },
				onSaveAndExit: () => { this.saveAndExitClick() }
			}
		}
		this.props.EditConfirmation(configs);
	}
	deleteDashboard(dashboardId) {
		if (dashboardId) {
			this.props.DeleteDashboardInHeader(dashboardId);
		}
	}

	showConfirmation(dashboard) {
		const configs = {
			type: ResponseStatusEnum.Confirmation,
			messages: [this.props.l.t('Are_you_sure_you_want_to_delete', 'Are you sure you want to delete') + ` "${dashboard.name}" ` + this.props.l.t('dashboard', 'dashboard?')],
			func: {
				onOk: () => { this.props.ResetDashboard(); this.deleteDashboard(dashboard.Id); browserHistory.push(`/dashboard/mydashboards`) },
				onCancel: () => { }
			}
		}
		this.props.DeleteConfirmation(configs);

	}

	showConfirmationInNewDashboard() {
		const configs = {
			type: ResponseStatusEnum.Confirmation,
			messages: [this.props.l.t('Are_you_sure_you_want_to_discard_the_changes', 'Are you sure you want to discard the changes?')],
			func: {
				onOk: () => { this.props.ResetDashboard(); browserHistory.push(`/dashboard/mydashboards`) },
				onCancel: () => { },

			}
		}
		this.props.EditConfirmation(configs);

	}

	onFilesClick() {
		//this.props.ResetDashboard();
		ModalManager.close();
		this.props.HandleModalPopup(false);
		this.showEditConfirmation();
	}

	showSaveAsModalPopup() {
		this.props.HandleSaveAsPopUp(true);
	}

	OnSaveAsCancel() {
		//this.props.UpdateDashboardProperty("name", '')
		this.props.HandleSaveAsPopUp(false);
		SaveAsModalManager.close();
	}
	saveAsDashboard(name) {

		//this.props.UpdateDashboardProperty("name", name)
		this.handleDocks();
		this.props.HandleSaveAsPopUp(false);
		this.props.SaveAsDashboard(name, false)
		SaveAsModalManager.close();
	}

	handleDocks() {
		console.log(this)
		this.props.CollapseAllSettingsMenus();
		this.props.CollapseAllEditorMenus();
	}

	render() {

		return (
			<div>
				<div className="page-toolbar dashboard-toolbar">
					<a
						onClick={() => { this.handleDocks(); this.onFilesClick() }}
						className="action-tool bg-skyblue" role="button">
						<i className="tool-icon fa fa-arrow-circle-left" />
						<span className="tool-title">{this.props.l.t('Files', 'Files')}</span>
					</a>
					<div className="db-actions-left">
						<a
							onClick={() => { this.handleDocks(); this.props.newDashboard.Id ? this.props.UpdateDashboard() : this.props.SaveDashboard() }}
							className="action-tool" role="button">
							<i className="tool-icon fa fa-floppy-o" />
							<span className="tool-title">{this.props.l.t('Save', 'Save')}</span>
						</a>
						<a
							onClick={() => { this.showSaveAsModalPopup() }}
							className="action-tool" role="button">
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE9SURBVDhPrZOvS0NRHMUvJieYlgQRcVNWVgwWFcS0VaNgtYiuCNufMNBiUQyCwSCKwTZY8ldyZQxcFRaUBbHZnn7O5d7hVXl7Og98+H7fuece3hvMRFG0Ak/viNlinMVB5h7a7DnjhfGM4bXk7EBklqEOW2SmFGR/gTkbkPFJC9b8IsKrOmTuMya0Szx3ITtQiYR3/h8lN0EJxqK7Fwi/wHEDKjCprNdPJbeMahxkasyevpX8Rb0SFqnMup4U8kfM4E1e3ecHws8ReoAdmHe2Fc95XUxSMkToAsahDZvuKHmJROgQDhRiShvO/1VJBjou54vWIAVXcN23RCKYBVvEfIRtKMIolBSI+pVIxKbhDlRwyh39o2f9YRPeMEesESMyw2T3QD92B8bsAcsMnMCl2mM4JpN27ELGFhhjPgBroPJuVh+5rQAAAABJRU5ErkJggg==" />
							<span className="tool-title">{this.props.l.t('Save As', 'Save As')}</span>
						</a>



						{/* <a onClick={() => { this.props.CollapseAllSettingsMenus(); browserHistory.push(`/dashboard/preview/${this.props.newDashboard.Id}`) }} className="action-tool pointer" role="button">
							<i className="tool-icon fa fa-eye" />
							<span className="tool-title">{this.props.l.t('Preview', 'Preview')}</span>
						</a> */}
						<a onClick={() => { this.handleDocks(); this.props.UpdateViewFlag(true); browserHistory.push(`/dashboard/view/${this.props.newDashboard.Id}`) }} className="action-tool pointer" role="button">
							<i className="tool-icon fa fa-desktop" />
							<span className="tool-title">{this.props.l.t('Live', 'Live')}</span>
						</a>
					</div>
					<div className="db-item-tools">
						<a onClick={() => this.props.AddWidget(widgetType.Pie)} className="action-tool" role="button">
							<i className="tool-icon fa fa-pie-chart" />
							<span className="tool-title">{this.props.l.t('Pie', 'Pie')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Progress)} className="action-tool" role="button">
							<i className="tool-icon fa fa-line-chart" />
							<span className="tool-title">{this.props.l.t('Progress', 'Progress')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Bar)} className="action-tool" role="button">
							<i className="tool-icon fa fa-bar-chart" />
							<span className="tool-title">{this.props.l.t('Bar', 'Bar')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Speedo)} className="action-tool" role="button">
							<i className="tool-icon fa fa-dashboard" />
							<span className="tool-title">{this.props.l.t('Speedo', 'Speedo')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Clock)} className="action-tool" role="button">
							<i className="tool-icon fa fa-clock-o" />
							<span className="tool-title">{this.props.l.t('Clock', 'Clock')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.CircularProgress)} className="action-tool" role="button">
							<i className="tool-icon fa fa-circle-o-notch" />
							<span className="tool-title">{this.props.l.t('Progress', 'Progress')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Box)} className="action-tool" role="button">
							<i className="tool-icon fa fa-square-o" />
							<span className="tool-title">{this.props.l.t('Box', 'Box')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Combo)} className="action-tool" role="button">
							<i className="tool-icon fa fa-th-large" />
							<span className="tool-title">{this.props.l.t('Combo', 'Combo')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Text)} className="action-tool" role="button">
							<i className="tool-icon fa fa-text-width" />
							<span className="tool-title">{this.props.l.t('Text', 'Text')}</span>
						</a>
						<a onClick={() => this.props.AddWidget(widgetType.Picture)} className="action-tool" role="button">
							<i className="tool-icon fa fa-picture-o" />
							<span className="tool-title">{this.props.l.t('Picture', 'Picture')}</span>
						</a>
					</div>
					<div className="db-actions-right">
						<div className="action-tool" style={{ "flexDirection": "row" }}>
							<span className="tool-title margin-right-10 rtl-margin-right-10">{this.props.l.t('Name', 'Name')}</span>
							<input
								type="text"
								className=""
								placeholder="Dashboard name"
								value={this.props.newDashboard.name}
								onChange={(e) => this.props.UpdateDashboardProperty("name", e.target.value)} />
						</div>
						<label className="action-tool">
							<input
								type="checkbox"
								className="tool-icon"
								checked={this.props.newDashboard.isDefault}
								onChange={(e) => this.props.UpdateDashboardProperty("isDefault", e.target.checked)} />
							<span className="tool-title">{this.props.l.t('Default', 'Default')}</span>
						</label>
						<label className="action-tool">
							<input
								type="checkbox"
								className="tool-icon"
								checked={this.props.newDashboard.isGlobal}
								onChange={(e) => this.props.UpdateDashboardProperty("isGlobal", e.target.checked)} />
							<span className="tool-title">{this.props.l.t('Global', 'Global')}</span>
						</label>
						<a onClick={() => this.state.id ? this.showConfirmation(this.props.newDashboard) : this.showConfirmationInNewDashboard()} className="action-tool" role="button">
							<i className="tool-icon fa fa-trash" />
							<span className="tool-title">{this.props.l.t('Delete', 'Delete')}</span>
						</a>
						<a onClick={() => this.props.toggleWidgetMenu(false)} className="action-tool bg-skyblue" role="button">
							<i className='tool-icon fa fa-angle-double-up' aria-hidden="true"></i>
							<span className="tool-title">{this.props.l.t('Hide', 'Hide')}</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}
